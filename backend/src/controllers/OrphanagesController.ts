import { Response, Request, request } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import OrphanagesView from '../views/orphanages_view';
import * as yup from 'yup'


export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({ relations: ['images'] })
        return res.status(200).json(OrphanagesView.renderMany(orphanages));
    },
    async show(req: Request, res: Response) {
        try {

            const { id } = req.params
            const orphanagesRepository = getRepository(Orphanage);
            const orphanage = await orphanagesRepository.findOneOrFail(id, { relations: ['images'] })
            return res.status(200).json(OrphanagesView.render(orphanage));

        } catch (error) {
            return res.status(404).json({ message: 'not found' })
        }
    },
    async create(req: Request, res: Response) {

            const {
                name,
                latitude,
                longitude,
                about,
                instruction,
                opening_hours,
                open_on_weekends
            } = req.body;

            const orphanagesRepository = getRepository(Orphanage);

            const requestImages = req.files as Express.Multer.File[];
            const images = requestImages.map(image => {
                return { path: image.filename }
            })

            const data = {
                name,
                latitude,
                longitude,
                about,
                instruction,
                opening_hours,
                open_on_weekends: open_on_weekends === "true" ?  true: false,
                images
            }

            const schema = yup.object().shape({
                name: yup.string().required(),
                latitude: yup.number().required(),
                longitude: yup.number().required(),
                about: yup.string().required().max(300),
                instruction: yup.string().required(),
                opening_hours: yup.string().required(),
                open_on_weekends: yup.boolean().required(),
                images: yup.array(
                    yup.object().shape({
                        path: yup.string().required(),
                    })
                ),
            })

            const finalData = schema.cast(data);

            await schema.validate(data,{
                abortEarly:false
            })

            const orphanage = orphanagesRepository.create(data);
            await orphanagesRepository.save(orphanage)
            return res.status(201).json(orphanage)

        
    }
}