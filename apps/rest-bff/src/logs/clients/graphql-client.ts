import axios from 'axios';

export class GraphQLClient {
  constructor(private readonly url: string) {
    this.url = url;
  }

  async addLog(job_id: number, message: string, status: string) {
    const mutation = `
    mutation  {
      addLog(job_id: ${job_id}, message: "${message}", status: "${status}") {
        id
        job_id
        message
        status
        created_at
      }
    }
    `;

    const payload = JSON.stringify({ query: mutation });

    const response = await axios.post(this.url, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data.data.addLog;
  }
}
