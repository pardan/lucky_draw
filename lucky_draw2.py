from openpyxl import load_workbook
from random import randint
import schedule
import time
import database


def main():
    num = randint(1,66339)
    #print(num)

    db = database.koneksi()
    cursor = db.cursor()
    query = """
            WITH coba AS
                (SELECT ROW_NUMBER() OVER() AS num_row, Undian FROM tb_pengundian)

            SELECT Undian FROM coba
            WHERE num_row = '%s'
            """ % (num)
    cursor = db.cursor()
    cursor.execute(query)
    winner = cursor.fetchone()
    cursor.close()
    db.close()

    return winner


    schedule.every(0).seconds.do(main)
    while True:
        schedule.run_pending()
        time.sleep(0)