import Orphanage from "../models/Orphanage";
import ImagesView from "./images_view";

export default {
    render(orphanage: Orphanage)
    {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instruction: orphanage.instruction,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: ImagesView.renderMany(orphanage.images)
        }
    },
    renderMany(orphanages: Orphanage[])
    {
        return orphanages.map(orphanage =>{
            return this.render(orphanage)
        })
    }
} 