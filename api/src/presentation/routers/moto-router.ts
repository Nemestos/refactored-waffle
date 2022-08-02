import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import CreateMotoUseCase from '~/application/interfaces/uses-cases/moto/create-moto'
import DeleteMotoByIdUseCase from '~/application/interfaces/uses-cases/moto/delete-moto-by-id'
import GetAllMotoUseCase from '~/application/interfaces/uses-cases/moto/get-all-moto'
import GetMotoByIdUseCase from '~/application/interfaces/uses-cases/moto/get-moto-by-id'
import UpdateMotoUseCase from '~/application/interfaces/uses-cases/moto/update-moto'
import { GetMotosByManufacturer } from '~/application/use-cases/moto/get-motos-by-manufacturer'
import { Groups } from '~/domain/base/groups'
import { MotoCreationDto, MotoUpdateDto } from '~/domain/dtos/moto-dto'
import Moto from '~/domain/entities/moto'
import { Scopes } from '~/domain/enums/scope-enum'
import { Jwt } from '~/domain/interfaces/jwt'
import { ResponseStructureArray, ResponseStructureSingle } from '~/domain/types/response-structure'
import { authMiddleware } from '~/presentation/middlewares/auth.middleware'
import { transform } from '~/presentation/middlewares/response-wrapper.middleware'
import { validateBody } from '../middlewares/validate-body.middleware'

export default function MotosRouter(
  createMotoUseCase: CreateMotoUseCase,
  updateMotoUseCase: UpdateMotoUseCase,
  getAllMotosUseCase: GetAllMotoUseCase,
  getMotoByIdUseCase: GetMotoByIdUseCase,
  getMotoByManufacturer: GetMotosByManufacturer,
  deleteMotoByIdUseCase: DeleteMotoByIdUseCase,
  jwtService: Jwt<any>
) {
  const router = express.Router()
  const createMotoMiddleware = authMiddleware(jwtService, [Scopes.CanCreateMotos])
  const updateMotoMiddleware = authMiddleware(jwtService, [Scopes.CanUpdateMotos])
  const getMotosMiddleware = authMiddleware(jwtService, [Scopes.CanGetMotos])
  const deleteMotosMiddleware = authMiddleware(jwtService, [Scopes.CanDeleteMotos])

  router.post(
    '/',
    validateBody(Moto, [Groups.CREATE]),
    createMotoMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await createMotoUseCase.execute({
          ...req.body
        } as MotoCreationDto)
        res.statusCode = StatusCodes.CREATED
        res.json({ message: 'La Moto a bien été crée' })
      } catch (err) {
        next(err)
      }
    }
  )

  router.patch(
    '/:id',
    validateBody(Moto, [Groups.UPDATE]),
    updateMotoMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await updateMotoUseCase.execute(id, {
          ...req.body
        } as MotoUpdateDto)
        res.statusCode = StatusCodes.OK
        res.json({ message: 'La Moto a bien été mise à jour' })
      } catch (err) {
        next(err)
      }
    }
  )
  router.get('/', getMotosMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motos = await getAllMotosUseCase.execute()
      const transformedMotos = transform(Moto, motos, [Groups.READ]) as ResponseStructureArray<Moto>

      return res.status(StatusCodes.OK).json(transformedMotos)
    } catch (error) {
      next(error)
    }
  })
  router.get('/:id', getMotosMiddleware, async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const moto = await getMotoByIdUseCase.execute(id)
      const transformedMotos = transform(Moto, moto, [Groups.READ]) as ResponseStructureSingle<Moto>
      return res.status(StatusCodes.OK).json(transformedMotos)
    } catch (error) {
      next(error)
    }
  })

  router.get(
    '/manufacturer/:name',
    getMotosMiddleware,
    async (req: Request<{ name: string }>, res: Response, next: NextFunction) => {
      const manufacturerName = req.params.name
      try {
        const moto = await getMotoByManufacturer.execute(manufacturerName)
        const transformedMotos = transform(Moto, moto, [Groups.READ]) as ResponseStructureArray<Moto>
        return res.status(StatusCodes.OK).json(transformedMotos)
      } catch (error) {
        next(error)
      }
    }
  )
  router.delete(
    '/:id',
    deleteMotosMiddleware,
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const id = req.params.id
      try {
        await deleteMotoByIdUseCase.execute(id)
        return res.status(StatusCodes.OK).json({ message: 'La Moto à bien supprimée ' })
      } catch (error) {
        next(error)
      }
    }
  )

  return router
}
