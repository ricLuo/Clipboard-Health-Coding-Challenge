import pandas as pd
import re
from pprint import pprint
from os.path import join, dirname
import numpy as np
from pymongo import MongoClient

from geopy.geocoders import Nominatim

df = pd.read_csv(join(dirname(__file__), '../data/projectnurse.csv'))

client = MongoClient('mongodb://localhost:27017/')
db = client['clipboardinterview']

# delete_columns = ["Do you have any special skills that set you apart from other nurses? (examples: CCRN, CNOR, Special Procedures, etc.)"]
# df.drop(delete_columns, axis=1, inplace=True)

# df.drop(["Do you have any special skills that set you apart from other nurses? (examples: CCRN, CNOR, Special Procedures, etc.)"])
# rename header
df.rename(index=str, columns={
    "What (City, State) are you located in?":"location",
    "What's your highest level of education?":"education",
    "Department":"department",
    "How's the employee turnover?":"turnover",
    "How many years of experience do you have?":"experience",
    "What is/was your length of orientation/training?":"training",
    "What is the Nurse - Patient Ratio?":"patientNurseRatio",
    "What is your hourly rate ($/hr)?":"salary",
    "What's Your Shift Length?":"Shift_length",
    "Which Shift?":"shift_name",
    "Other":"other",
    "Full-Time/Part-Time?":"job_type",
    "Do you have any special skills that set you apart from other nurses? (examples: CCRN, CNOR, Special Procedures, etc.)":"special_skills",
    "Would you recommend your department to another nurse?":"recommoend_your_department",
    "How did you hear about Project Nurse?":"How_did_you_hear",
    "Start Date (UTC)":"start_date_UTC",
    "Submit Date (UTC)":"submit_date_UTC"
}, inplace=True)

df_bak = df.copy

#convert all data to string including NaN of float
for row in range(df.shape[0]):
    for col in df.columns:
        df[col][row]=str(df[col][row]).lower();

lat = []
lng = []

def add_lat_long(df):
    geolocator = Nominatim()
    for loc in df['location']:
        Loc = geolocator.geocode(loc)
    #     if Loc is not None:
    #         print((Loc.latitude, Loc.longitude))
        if Loc is not None:
            lat.append(Loc.latitude)
            lng.append(Loc.longitude)
        else:
            lat.append(None)
            lng.append(None)


# function to clean data using regular expression
def shape_data(df, colName, reg, df_bak):
    try:
        for row in range(df.shape[0]):
            match = re.findall(reg, df[colName][row])
            if(match==[]):
                continue
            afterShape=''
            for item in match:
                afterShape=afterShape+item+','
                df[colName][row]=''
            if afterShape.endswith(','):
                afterShape = afterShape[:-1]
            df[colName][row]=afterShape
    except Exception as e:
        print(e)
        df = df_bak
        # df_bak = pd.read_csv('projectnurse.csv', dtype=str)
    return

# add latitude and longitude to dataframe
add_lat_long(df)
df['lat'] = lat
df['lng'] = lng

# shape nurse-patient ratio
shape_data(df, 'What is the Nurse - Patient Ratio?', '[0-9]+:[0-9]+', df_bak)

# shape wage
shape_data(df, 'What is your hourly rate ($/hr)?', '[0-9]+\,?[0-9]+\.?[0-9]*', df_bak)

MyRecords = db['MyRecords']

MyRecords.insert_many(df.to_dict('MyRecords'))

# pprint(list(db.record.find()))
