from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict


class CustomPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 10
    page_query_param = 'page'
    ordering = 'id'

    def get_paginated_response(self, data):
        response = Response(OrderedDict([
            ('lastPage', self.page.paginator.num_pages),
            ('countItemsOnPage', self.page_size),
            ('current', self.page.number),
            ('results', data)
        ]))
        return response