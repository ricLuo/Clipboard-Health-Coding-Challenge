import pandas as pd
import re
from os.path import join, dirname
from pymongo import MongoClient
import time

import geocoder
# from geopy.geocoders import Nominatim
# Hydrogen

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

# clean data using regular expression
# '[0-9]+\,?[0-9]+\.?[0-9]*'
# -1 represents invalid data
def handleSalary(df, regex):
    try:
        for row in range(df.shape[0]):
#           find if it contains yr or year
            sal = df['salary'][row]
            mark=''
            afterShape=-1
            match=[]
#           match year
            if (sal.find('year')!=-1) | (sal.find('yr')!=-1) | (sal.find('anual')!=-1):
                mark = 'year'
            elif sal.find('month')!=-1:
                mark = 'month'
            elif (sal.find('week')!=-1):
#                 drop 2 row weekend
                if sal.find('weenkend')!=-1:
                    df['salary'][row]=-1
                    continue
                if (sal.find('biweek')!=-1) | (sal.find('bi week')!=-1) | (sal.find('other week')!=-1):
                    mark = 'biweek'
                else:
                    mark = 'week'
#           find all matching numbers
            match = re.findall(regex, sal)
            if(match==[]):
                df['salary'][row]=-1
                continue
            if(len(match)>1):
#                 drop 4 rows
                afterShape=-1
            else:
#               remove ',' in number
#                 print("match: ",match[0])
                if ',' in match[0]:
                    match[0]=match[0].replace(',','')
                afterShape=float(match[0])
#             print('mark: ',mark)
            if mark=='year':
#               2080 workhours per year
                afterShape=round(afterShape/2080,2)
            elif mark=='month':
#               173 workhours per month
                afterShape=round(afterShape/173,2)
            elif mark=='biweek':
#               80 workhours per bi-week
                afterShape=round(afterShape/80,2)
            elif mark=='week':
#               40 workhours per week
                afterShape=round(afterShape/40,2)
            else:
                afterShape=afterShape
#             print("afterShape: ",afterShape)
            if afterShape>=1000:
#                 drop the 5 rows where data is wrong or we cannot determine the time scale for salary
                df['salary'][row]=-1
            else:
                df['salary'][row]=round(afterShape,2)
            print('salary', df['salary'][row])
    except Exception as e:
        print(e)


# Use geocoder to transform location to latitude and longitude
lat = []
lng = []
count=0
def transformLocation():
    for loc in df['location']:
        count+=1
        g = geocoder.google(loc)
        print(g)
        if(g is None):
            print(loc)
        else:
            lat.append(g.latlng[0])
            lng.append(g.latlng[1])
        if count==10:
            count=0
            # There's a 10 sec limits of Google Api, thus we use sleep 1 sec
            time.sleep(1)

#  transform alternative, no limit but super slow
def transformLocation_2(df):
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
        df[col][row]=str(df[col][row])

# Because of the geocoder limits and for saving time consuming,
# I saved results in text file and directly load it.
def read_lng():
    with open(join(dirname(__file__), './longitude.txt')) as f:
        content = f.readlines()
    content = [float(x.strip()) for x in content]
    return content

def read_lat():
    with open(join(dirname(__file__), './latitude.txt')) as f:
        content = f.readlines()
    content = [float(x.strip()) for x in content]
    return content

# ----------run----------------------

lng = read_lng()
lat = read_lat()
df['lat'] = lat
df['lng'] = lng


# shape nurse-patient ratio
shape_data(df, 'patientNurseRatio', '[0-9]+:[0-9]+', df_bak)

# shape wage
# shape_data(df, 'salary', '[0-9]+\,?[0-9]+\.?[0-9]*', df_bak)

handleSalary(df, '[0-9]+\,?[0-9]+\.?[0-9]*')

# pprint(list(db.record.find()))
# db.record.insert_many(df.to_dict('records'))

# insert to db MyRecords dict form, with orient=records
db.MyRecords.insert_many(df.to_dict('records'))

client.close()
