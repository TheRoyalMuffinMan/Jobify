import csv
import json
 
def make_json(csvFilePath: str, jsonFilePath: str) -> None:
    final, data = [], []
     
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        
        for rows in csvReader:
            data.append(rows)
    
        for d in data:
            if d["fraudulent"] == "1":
                final.append(d)

        for d in data:
            if len(final) == 10000: # 5000
                break

            if d["fraudulent"] == "1":
                continue
            
            final.append(d)

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(final, indent=4))

def main() -> None:
    csvFilePath = r'fake_job_postings.csv'
    jsonFilePath = r'postings.json'
    make_json(csvFilePath, jsonFilePath)

if __name__ == "__main__":
    main()