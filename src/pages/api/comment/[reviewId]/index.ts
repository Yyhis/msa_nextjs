import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'
/**
 * {"data":[{"id":1,"reviewId":"1","text":"피자빵 맛있네요!!","userId":"clgd0le6z0000l8085nscclal","createTime":"2023-06-12T03:43:32.958Z"},
 * {"id":2,"reviewId":"1","text":"식빵 가성비 좋음","userId":"clhhbrp5p0000x2d0ufedsrw2","createTime":"2023-06-12T03:43:32.958Z"}]}
 */
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse)  {
        const { reviewId } = req.query
        if(reviewId != undefined) {
            const readResult = await prisma.comment.findMany({
                where: { reviewId: reviewId as string }
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