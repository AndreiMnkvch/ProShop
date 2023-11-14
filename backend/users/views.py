from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, exceptions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from users.models import User
from users.serializers import UserSerializer
from .permissions import IsOwner
from .services.login_service import login_service

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'create':
                permission_classes = [AllowAny]
        elif self.action == 'list':
                permission_classes = [IsAdminUser]
        else:
                permission_classes = [IsAdminUser|IsOwner]
        return [permission() for permission in permission_classes]

    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):
        return login_service(request)
