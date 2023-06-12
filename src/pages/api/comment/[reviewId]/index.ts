import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse)  {
        const { reviewId } = req.query
            if(reviewId != undefined) {
                const readResult = await prisma.comment.findMany({
                    where: { reviewId: reviewId }
                })
                console.log(readResult)
                if (readResult != null) {
                    // 성공!!
                    res.status(200).json({
                        data: readResult,
                    })
                } else {
                    res.status(404).json({
                        error: {
                            code: 400,
                            message: '리뷰 조회를 실패하였습니다.',
                        },
                    })
                }
            }
            else {
                res.status(404).json({
                    error: {
                        code: 400,
                        message: '리뷰 id가 없습니다.',
                    },
                })
            }
}