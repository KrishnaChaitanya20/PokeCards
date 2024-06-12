from PIL import Image

def resize_image(input_image_path, output_image_path, new_width, new_height):
    image = Image.open(input_image_path)
    resized_image = image.resize((new_width, new_height))
    resized_image.save(output_image_path)

# Example usage
input_path = "pokeball_og.png"
output_path = "pokeball_resized.png"
new_width = 72
new_height = 72

resize_image(input_path, output_path, new_width, new_height)