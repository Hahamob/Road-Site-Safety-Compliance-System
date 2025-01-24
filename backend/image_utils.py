from PIL import Image
from io import BytesIO

def compress_image(image_content: bytes, max_size: int = 512 * 1024, max_dimensions: tuple = None) -> bytes:
    """
    压缩图片到指定大小，并可选限制分辨率。
    参数:
        image_content (bytes): 原始图片内容。
        max_size (int): 压缩后的最大图片大小（字节）。
        max_dimensions (tuple): 可选的最大分辨率 (宽, 高)。
    返回:
        bytes: 压缩后的图片内容。
    """
    try:
        img = Image.open(BytesIO(image_content))
        if img.mode != "RGB":
            img = img.convert("RGB")

        # 如果提供了分辨率限制，则调整分辨率
        if max_dimensions:
            img.thumbnail(max_dimensions, Image.ANTIALIAS)

        output = BytesIO()
        quality = 85  # 初始质量
        while True:
            output.seek(0)
            img.save(output, format="JPEG", quality=quality, optimize=True)
            size = output.tell()
            if size <= max_size:
                break
            quality -= 5
            if quality < 10:  # 最小质量限制
                raise ValueError("Cannot compress image below size limit.")
        return output.getvalue()

    except Exception as e:
        raise ValueError(f"Error compressing image: {e}")
