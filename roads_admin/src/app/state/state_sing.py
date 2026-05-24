import numpy as np
from keras.models import load_model
from PIL import Image
from PIL import ImageOps

def state_sing(path_to_img):
    state_sing = [
        'Выцветание',
        'Корозия/Ржавчина',
        'Вмятины/Погнутости',
        'Хорошее состояние',
    ]

    model = load_model('./src/app/state/keras_model.h5')

    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    image = Image.open(path_to_img)

    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    data[0] = normalized_image_array

    prediction = model.predict(data)

    for index in prediction:
        i = np.argmax(index)
        for j in state_sing:
            if i == state_sing.index(j):
                return state_sing[i]