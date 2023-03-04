import csv
import json
 
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = []
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        
        for rows in csvReader:
            entry = {
                "content": "",
                "fraudulent": ""
            }
            for row in rows:
                if row == "job_id": continue
                if row == "fraudulent":
                    entry["fraudulent"] = "Real" if rows[row] == '0' else "Fake"
                else:
                    entry["content"] += f"{row}: {rows[row]}\n"

            data.append(entry)
 
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your
# computer system
csvFilePath = r'fake_job_postings.csv'
jsonFilePath = r'postings.json'
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)