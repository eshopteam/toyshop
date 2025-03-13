from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel
from .forms import CustomUserCreationForm, CUstomUserChangeForm


@admin.register(CustomUserModel)
class CustomUserAdmin(UserAdmin):
    model = CustomUserModel
    add_form = CustomUserCreationForm
    form = CUstomUserChangeForm

    list_display = ('email', 'phone_number')

    fieldsets = (
        (None, {'fields': ('username', 'email', 'phone_number')}),
    )

    add_fieldsets = (
        (None, {'fields': ('username', 'email', 'phone_number', 'password1', 'password2')}),
    )
