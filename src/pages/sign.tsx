import Layout from "../layout/Layout";
import { Anchor, Button } from "@components/atoms";
import { LoginOrJoinForm } from "@components/organics";

export default function Sign() {
    return (
        <Layout title="Sign">
            <LoginOrJoinForm />

            {/* 아이디 / 비밀번호를 잊어버렸어요 */}
            {/* 모달 창 */}

            <Anchor href={"/"}>
                <Button>되돌아가기</Button>
            </Anchor>
        </Layout>
    );
}
