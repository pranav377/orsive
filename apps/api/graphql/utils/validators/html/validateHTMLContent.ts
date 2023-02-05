import Joi from 'joi';
import { JSDOM } from 'jsdom';
import probe from 'probe-image-size';
import xss, { whiteList } from 'xss';

export default async function validateHTMLContent(
    value: string,
    _helpers: Joi.ExternalHelpers
) {
    const dom = new JSDOM();

    let container = dom.window.document.createElement('body');
    container.innerHTML = value;

    let div = container.getElementsByTagName('div');
    for (let index = 0; index < div.length; ++index) {
        div[index].innerHTML = div[index].innerHTML.replace(/\&nbsp;/g, '');
    }

    let images = container.getElementsByTagName('img');
    for (let index = 0; index < images.length; ++index) {
        let { width, height } = await probe(images[index].src);
        images[index].height = height;
        images[index].width = width;
    }

    value = container.innerHTML;

    if (value.length < 7) {
        throw new Error('Value not valid');
    }

    const sanitized = xss(value, {
        whiteList: {
            ...whiteList,
            img: ['alt', 'src', 'width', 'height'],
        },
    });

    return sanitized;
}
