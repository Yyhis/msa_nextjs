import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'
import { Prisma } from '@prisma/client'

// 댓글 내용 예시
const comments = [
    {id: 1, reviewId: 1, text: 'Hello World', userId: 1, createTime: 1992},
    {id: 2, reviewId: 1, text: 'By World', userId: 2, createTime: 1993},
    {id: 3, reviewId: 1, text: 'By World', userId: 3, createTime: 1994},
]

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse)  {
    const readResult = await prisma.comment.findMany({
        orderBy: [
            {
                id: 'desc',
            },
        ],
    })
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