import requests

# Define the query parameters
params = {
    'productType': 'solid',
    'calories': 300,
    'sugar': 5,
    'fat': 10,
    'salt': 700,
    'servingSize': 150
}

# Send a GET request
response = requests.get('http://localhost:3000/nutrients', params=params)

# Check if the request was successful
if response.status_code == 200:
    results = response.json()
    print("Nutrient Differences:")
    for result in results:
        print(f"{result['name']}: Difference = {result['difference']}, "
              f"Difference in % = {result['percentageDiff']}%")
else:
    print("Failed to retrieve data:", response.status_code)
