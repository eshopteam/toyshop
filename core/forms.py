from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUserModel

class CustomUserCreationForm(UserCreationForm): # sign up
    class Meta:
        model = CustomUserModel
        fields = ('username', 'email', 'phone_number')

    
class CUstomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUserModel
        fields = ('username', 'email', 'phone_number')

