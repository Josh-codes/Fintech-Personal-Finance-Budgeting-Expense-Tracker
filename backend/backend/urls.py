from django.contrib import admin
from django.urls import path,include
from api.views import CreateUser
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUser.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="obtain_token"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="refresh_token"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include("api.urls")),
]