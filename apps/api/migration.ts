/*The code in this file will be run while deploying. 
Can include db operations, data transfer, data migration, etc.
*/

import { JSDOM } from "jsdom";
import prisma from "./graphql/utils/data/dbClient";
import probe from "probe-image-size";

(async () => {
  let orsics = await prisma.orsic.findMany();

  orsics.map(async (orsic) => {
    let htmlContent = orsic.content;
    const dom = new JSDOM();

    let container = dom.window.document.createElement("body");
    container.innerHTML = htmlContent;

    let images = container.getElementsByTagName("img");
    for (let index = 0; index < images.length; ++index) {
      let img = images[index];

      let { width, height } = await probe(img.src);

      img.setAttribute("width", width.toString());
      img.setAttribute("height", height.toString());

      images[index].outerHTML = img.outerHTML;
    }

    await prisma.orsic.update({
      where: {
        id: orsic.id,
      },
      data: {
        content: container.innerHTML,
      },
    });
  });
})();
