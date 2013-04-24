import csv
import sys
import datetime
from pymongo import MongoClient

ppi_types = (
    'Year',
    'Cities',
    'States',
    'Majors and Minors',
    'Faculty',
    'Gender',
    'GPA',
    'Class Number',
    'Class Year',
    'Sexual Orientation',
    'Season',
    'Letter Grade',
    'Building (Abbr)',
    'Building (Full)',
)


client = MongoClient()
collection = client.igert.survey
rows = []
for record in collection.find():
    row = [record[u'_id'], record[u'gender'], record[u'age'],
           record[u'tool_response'], record[u'date'], record[u'uic_student'],
           record[u'student_status']]
    ppi_so_far = dict()
    for response in record[u'responses']:
        if u'ppi_counts' in response:
            ppi_so_far[response[u'question']] = sum([int(v) for k, v in response[u'ppi_counts'].items()])
            cur_ppi = ", ".join(["%s: %s" % (k, v) for k, v in response[u'ppi_counts'].items()])
            row_ppi_types = [response[u'ppi_counts'].get(ppi, 0) for ppi in ppi_types]
        else:
            ppi_so_far[response[u'question']] = 0
            cur_ppi = ""
            row_ppi_types = [0] * len(ppi_types)

        row_values = [
            response[u'group'],
            response[u'question'],
            cur_ppi,
            sum(ppi_so_far.values()),
            datetime.datetime.fromtimestamp(float(response[u'time']) / 1000),
        ]

        rows.append(row + row_values + row_ppi_types)


writer = csv.writer(sys.stdout)

writer.writerow((
    "ID",
    "Gender",
    "Age",
    "Amount Dialog Influenced [1-5,N/A]",
    "Completed",
    "Is UIC Student",
    "Is Current Student",
    "Control or Test",
    "Question #",
    "PPI Revealed This Question",
    "# PPI Revealed So Far",
    "Question Submitted",
    'Year',
    'Cities',
    'States',
    'Majors and Minors',
    'Faculty',
    'Gender',
    'GPA',
    'Class Number',
    'Class Year',
    'Sexual Orientation',
    'Season',
    'Letter Grade',
    'Building (Abbr)',
    'Building (Full)',
))

for row in rows:
    writer.writerow(row)
