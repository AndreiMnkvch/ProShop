from rest_framework.response import Response
from rest_framework import status 
from rest_framework import exceptions
from users.models import User
from .token_services import generate_access_token, generate_refresh_token

def login_service(request):

    username = request.data.get('username')
    password = request.data.get('password')
    response = Response()

    if (username is None) or (password is None):
        raise exceptions.AuthenticationFailed(
            'username and password required')

    try: 
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response('User not found', status=status.HTTP_401_UNAUTHORIZED)
    
    if not user.check_password(password):
        return Response('Wrong password', status=status.HTTP_401_UNAUTHORIZED)

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
    response.data = {
        'access_token': access_token,
        'username': user.username,
        'id': user.id
    }
    return response