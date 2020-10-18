import Image from "../models/Image";

export default {
    render(image: Image)
    {
        return {
            id: image.id,
            url: `http://10.0.0.142:3333/upload/${image.path}`,
        }
    },
    renderMany(images: Image[])
    {
        return images.map(image =>{
            return this.render(image)
        })
    }
}  