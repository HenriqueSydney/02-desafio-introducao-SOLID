import { Request, Response } from 'express'

import { ListAllUsersUseCase } from './ListAllUsersUseCase'

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers

    if (Array.isArray(user_id)) {
      throw new Error('Invalid ID parameter')
    }

    try {
      const users = this.listAllUsersUseCase.execute({
        user_id,
      })

      return response.json(users)
    } catch (error) {
      if (
        error.message === 'User not a admin. Access to all users denied.' ||
        error.message === 'User not found.'
      ) {
        return response.status(400).json({ error: error.message })
      }
      throw error
    }
  }
}

export { ListAllUsersController }
