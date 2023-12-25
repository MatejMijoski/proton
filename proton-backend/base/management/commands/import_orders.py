import csv
import logging
from datetime import datetime

from django.core.management import BaseCommand
from django.db import transaction, IntegrityError

from crm.models import Customer, Product, Order, ProductOrder


def read_csv_chunk(file_path, chunk_size=1000):
    """
    Read CSV file in chunks

    return: a tuple of header and list of rows
    """
    with open(file_path, 'r', newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        header = next(csv_reader)

        while True:
            rows = []
            for _ in range(chunk_size):
                try:
                    row = next(csv_reader)
                    rows.append(row)
                except StopIteration:
                    break
            if not rows[1:]:
                break
            yield header, rows


class Command(BaseCommand):
    """
    Import orders, customers and products from a CSV file.
    """
    def add_arguments(self, parser):
        parser.add_argument('--file-path', type=str, help='Absolute path of the file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        for header, rows in read_csv_chunk(file_path, chunk_size=10):
            for row in rows:
                try:
                    with transaction.atomic():
                        customer, _ = Customer.objects.get_or_create(external_id=row[2], name=row[3])
                        product, _ = Product.objects.get_or_create(external_id=row[4], name=row[5])
                        order, _ = Order.objects.get_or_create(
                            external_id=row[1],
                            date=datetime.strptime(row[8], "%Y-%m-%d"),
                            customer=customer
                        )
                        ProductOrder.objects.get_or_create(
                            order=order,
                            product=product,
                            quantity=int(row[6]),
                            total_price=float(row[7])
                        )
                except ValueError as e:
                    logging.error(f"Row with data {row} could not be imported because of an error with data type.", exc_info=e)
                except IntegrityError as e:
                    logging.error(f"Row with data {row} could not be imported because of an integrity error.", exc_info=e)
