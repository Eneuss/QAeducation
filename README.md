
# QAeducatio

import sqlite3

# Replace 'your_database.db' with the path to your actual database file
conn = sqlite3.connect('your_database.db')
cur = conn.cursor()

# Replace 'selected_shopper_id' with the actual shopper ID
selected_shopper_id = 123  # example shopper ID

# SQL query to find the most recent basket for the current shopper created today
query = """
SELECT basket_id
FROM shopper_baskets
WHERE shopper_id = ?
AND DATE(basket_created_date_time) = DATE('now')
ORDER BY basket_created_date_time DESC
LIMIT 1
"""

# Execute the query passing the shopper_id as a parameter
cur.execute(query, (selected_shopper_id,))

# Fetch the result
basket_id = cur.fetchone()

# Check if a basket was found and print the result
if basket_id:
    print(f"The most recent basket ID for shopper {selected_shopper_id} is: {basket_id[0]}")
else:
    print(f"No basket found for shopper {selected_shopper_id} today.")

# Close the connection
conn.close()
