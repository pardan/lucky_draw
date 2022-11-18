import mysql.connector
from mysql.connector import Error

def koneksi():
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='db_luckydraw',
                                            user='root',
                                            password='')    
        return connection
    except Error as e:
        print("Error while connecting to MySQL", e)
        return False

def close(connection, cursor):
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

#36.89.30.147