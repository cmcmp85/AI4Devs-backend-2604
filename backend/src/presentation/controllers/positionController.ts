import { Request, Response } from 'express';
import { findCandidatesByPositionId } from '../../application/services/positionService';

export const getCandidatesByPosition = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const candidates = await findCandidatesByPositionId(id);
        return res.status(200).json(candidates);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'Position not found') {
            return res.status(404).json({ error: 'Position not found' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
