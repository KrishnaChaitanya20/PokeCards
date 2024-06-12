from PIL import Image

original_image = Image.open('pokeball_resized.png')

padding = (96-72)

new_width = original_image.width + (2 * padding)
new_height = original_image.height + (2 * padding)

new_image = Image.new('RGBA', (new_width, new_height), (0, 0, 0, 0))

paste_position = (padding, padding)

new_image.paste(original_image, paste_position)

new_image.save('pokeball.png')