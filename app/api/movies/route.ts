import { getUniqueDataFromJson } from './utils';

export async function GET() {
  try {
    const movies = await getUniqueDataFromJson('assets/movies.json');

    return Response.json({
      length: movies.length,
      movies,
    });
  } catch (error) {
    console.error('error', error);

    return new Response(`Data Fetching Error`, {
      status: 500,
    });
  }
}
