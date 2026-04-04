from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer, CartItemSerializer as AddToCartSerializer # Using same serializer for now or creating simplified one
from rest_framework.views import APIView


class CartView(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Each user only sees their own cart
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Auto-assign cart to logged-in user
        serializer.save(user=self.request.user)


class CartItemView(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return items from the logged-in user's cart
        return CartItem.objects.filter(cart__user=self.request.user)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity_val = request.data.get('quantity', 1)
            
            # Basic validation
            if not product_id:
                return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                quantity = int(quantity_val)
            except (ValueError, TypeError):
                return Response({"error": "quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

            # Get or create cart for user
            cart, _ = Cart.objects.get_or_create(user=request.user)

            # Important: Use product=Products.objects.get(id=product_id) to verify existence
            from products.models import Products
            try:
                product = Products.objects.get(id=product_id)
            except Products.DoesNotExist:
                return Response({"error": f"Product with ID {product_id} not found"}, status=status.HTTP_404_NOT_FOUND)

            # Check if item already in cart
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart, 
                product=product,
                defaults={'quantity': quantity}
            )

            if not created:
                cart_item.quantity += quantity
                cart_item.save()

            return Response({"message": "Item added to cart successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
