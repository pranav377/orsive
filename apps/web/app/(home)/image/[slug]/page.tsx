import { GRAPHQL_URL } from '@/config';
import GET_IMAGE from '@/graphql/queries/getImage';
import ContentImage from '@/ui/Content/Image';
import { print } from 'graphql/language/printer';

async function getData(slug: string) {
    const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: print(GET_IMAGE),
            variables: {
                slug,
            },
        }),
        next: { tags: [`image_${slug}`] },
    });

    // Recommendation: handle errors
    if (!res.ok) {
        throw new Error('Something went wrong with the server');
    }
    const data = await res.json();

    if (data.errors) {
        throw new Error('Something went wrong with the query');
    }

    return data;
}

export default async function ImagePage({
    params,
}: {
    params: { slug: string };
}) {
    const response = await getData(params.slug);

    return (
        <>
            <ContentImage image={response.data.getImage} />
        </>
    );
}
