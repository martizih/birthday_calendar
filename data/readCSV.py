import sys
sys.path.insert(0, '../..')
from definitions import *

import csv
import peewee

db = peewee.MySQLDatabase('birthday', user=user ,passwd=pw)

class Birthday(peewee.Model):
    name = peewee.CharField()
    surname = peewee.CharField()
    birthday = peewee.DateField()
    class Meta:
        database = db

Birthday.drop_table()
Birthday.create_table()
csv_data = csv.reader(open('birthday.csv'))
for row in csv_data:
    if row:
        birthday = Birthday(name=row[0], surname=row[1], birthday=row[2])
        birthday.save()
        
db.close()
