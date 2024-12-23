import pandas as pd

# Load dataset from Google Sheets CSV File
file_path = "C:\\IntelliJProjects\\FullStackProjects\\MCUDataDashboard\\google sheets/MCU_Movies_Dataset.csv"
df = pd.read_csv(file_path)

# Handle missing values if any
df.replace("TBD", pd.NA, inplace=True)

# Step 2 Fill missing numerical values with median values
df['Runtime (Minutes)'] = df['Runtime (Minutes)'].astype(float)
df['Budget (Millions USD)'] = df['Budget (Millions USD)'].astype(float)
df['Audience Score (%)'] = df['Audience Score (%)'].astype(float)

df['Runtime (Minutes)'] = df['Runtime (Minutes)'].fillna(df['Runtime (Minutes)'].median())
df['Budget (Millions USD)'] = df['Budget (Millions USD)'].fillna(df['Budget (Millions USD)'].median())
df['Audience Score (%)'] = df['Audience Score (%)'].fillna(df['Audience Score (%)'].median())

#3 Standardize text columns Capitalize movie titles and director names
df['Title'] = df['Title'].str.title()
df['Director(s)'] = df['Director(s)'].str.title()

# 4 Remove duplicates based on the 'Title' column
df.drop_duplicates(subset='Title', keep='first', inplace=True)

# 5 Validate data ranges
df = df[(df['IMDb Rating'] >= 0) & (df['IMDb Rating'] <= 10)]
df = df[(df['Audience Score (%)'] >= 0) & (df['Audience Score (%)'] <= 100)]

# 6 Save cleaned data to a new CSV file
cleaned_file_path = "C:\\IntelliJProjects\\FullStackProjects\\MCUDataDashboard\\google sheets/MCU_Movies_Cleaned.csv"
df.to_csv(cleaned_file_path, index=False)

print("Data Cleaning Completed!")