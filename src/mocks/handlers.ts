import { rest } from "msw";

export const handlers = [
    // log - 로그인 상태/로그아웃 상태
    rest.get("/user/log", (req, res, ctx) => {
        return res(
            ctx.json({
                status: true,
                data: {
                    logs: [
                        {
                            comment: "최초 로그인",
                            created_at: Date.now() - 20000,
                            amount: 5,
                        },
                        {
                            comment: "서비스 이용",
                            created_at: Date.now() - 200000,
                            amount: -1,
                        },
                        {
                            comment: "최초 로그인",
                            created_at: Date.now() - 2000000,
                            amount: 5,
                        },
                    ],
                },
            })
        );
    }),

    // log in
    rest.post("/user/in", (req, res, ctx) => {
        console.log(req);

        return res(
            ctx.json({
                status: true,
                data: {
                    id: 1,
                    username: "msw",
                    point: 10,
                },
            })
        );
    }),

    // log out

    // reset - put

    // reset - post
];
