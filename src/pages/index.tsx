import Layout from "../layout/Layout";
import { Anchor, Button } from "@components/atoms";

export default function Home() {
    return (
        <Layout title="Home">
            {/* 조건부: 로그인 안되어있을때만. */}

            <Anchor href={"/example"}>
                <Button>Go to Example</Button>
            </Anchor>
        </Layout>
    );
}
