from os.path import join, dirname
import pandas as pd
import numpy as np
from pymongo import MongoClient


client = MongoClient('mongodb://localhost:27017/')
db = client['clipboardinterview']
df = pd.read_csv(join(dirname(__file__), '../data/projectnurse.csv'))

db.insert
