import { Application, ApplicationWithCandidates } from '../../domain/models/Application';
import { Position } from '../../domain/models/Position';

export interface PositionCandidateDto {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number | null;
}

const calculateAverageScore = (interviews: { score: number | null }[]): number | null => {
    const scores = interviews
        .map((interview) => interview.score)
        .filter((score): score is number => score !== null);

    if (scores.length === 0) {
        return null;
    }

    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average * 10) / 10;
};

const mapApplicationToDto = (application: ApplicationWithCandidates): PositionCandidateDto => ({
    fullName: `${application.candidate.firstName} ${application.candidate.lastName}`.trim(),
    currentInterviewStep: application.interviewStep.name,
    averageScore: calculateAverageScore(application.interviews),
});

export const findCandidatesByPositionId = async (positionId: number): Promise<PositionCandidateDto[]> => {
    try {
        const position = await Position.findOne(positionId);
        if (!position) {
            throw new Error('Position not found');
        }

        const applications = await Application.findByPositionId(positionId);
        return applications.map(mapApplicationToDto);
    } catch (error) {
        if (error instanceof Error && error.message === 'Position not found') {
            throw error;
        }
        console.error('Error al buscar candidatos por posición:', error);
        throw new Error('Error al recuperar los candidatos de la posición');
    }
};
