import client from "./client";

import type {
    JournalResponse,
    JournalPageResponse,
    JournalSearchCriteria,
    UpdateFavoriteRequest,
    JournalStatisticsResponse,
    DownloadJournalResponse,
    DraftJournalQuery,
    DraftOverview,
} from "@/types/api/journal";

import type { MessageResponse } from "@/types/api/common";

class JournalApi {

    async createJournal(formdata: FormData): Promise<JournalResponse> {

        // The service layer will build this FormData.
        const { data } = await client.post<JournalResponse>(
            "/journals",
            formdata,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    // Instead of manually building query strings, we'll let Axios handle it...
    async getJournals(params?: JournalSearchCriteria): Promise<JournalPageResponse> {

        const { data } = await client.get<JournalPageResponse>(
            "/journals",
            {
                params,
            }
        );

        return data;
    }

    async getJournalById(id: string): Promise<JournalResponse> {

        const { data } = await client.get<JournalResponse>(
            `journals/${id}`
        );

        return data;
    }

    async updateJournal(
        id: string,
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } = await client.patch<JournalResponse>(
            `/journals/${id}`,
            formData,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    async deleteJournal(id: string): Promise<MessageResponse> {

        const { data } = await client.delete<MessageResponse>(
            `/journals/${id}`,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    async uploadJournalImages(
        journalId: string,
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } =
            await client.post<JournalResponse>(
                `/journals/${journalId}/images`,
                formData,
                {
                    timeout: 60000,
                }
            );

        return data;
    }

    async deleteJournalImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        const { data } =
            await client.delete<JournalResponse>(
                `/journals/${journalId}/images`,
                {
                    params: {
                        publicId,
                    },
                    timeout: 60000,
                }
            );

        return data;
    }

    async replaceJournalImage(
        journalId: string,
        publicId: string,
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } =
            await client.put<JournalResponse>(
                `/journals/${journalId}/images`,
                formData,
                {
                    params: {
                        publicId,
                    },
                    timeout: 60000,
                }
            );

        return data;
    }

    async setCoverImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        const { data } =
            await client.patch<JournalResponse>(
                `/journals/${journalId}/cover`,
                null,
                {
                    params: {
                        publicId,
                    },
                }
            );

        return data;
    }

    async updateFavorite(
        journalId: string,
        request: UpdateFavoriteRequest
    ): Promise<JournalResponse> {

        const { data } =
            await client.patch<JournalResponse>(
                `/journals/${journalId}/favorite`,
                request
            );

        return data;
    }

    async getJournalStatistics(): Promise<JournalStatisticsResponse> {
        const { data } =
            await client.get<JournalStatisticsResponse>(
                '/journals/statistics'
            );
        return data;
    }

    async downloadJournal(
        journalId: string
    ): Promise<DownloadJournalResponse> {

        const response = await client.get(
            `/journals/${journalId}/download`,
            {
                responseType: "blob",
                timeout: 60000,
            }
        );

        const disposition =
            response.headers["content-disposition"];

        let fileName = "journal.pdf";

        if (disposition) {

            const match =
                disposition.match(
                    /filename="?([^"]+)"?/
                );

            if (match) {
                fileName = match[1];
            }
        }

        return {
            blob: response.data,
            fileName,
        };
    }

    async createDraft(
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } = await client.post<JournalResponse>(
            "/journals/drafts",
            formData,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    async updateDraft(
        journalId: string,
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } = await client.patch<JournalResponse>(
            `/journals/drafts/${journalId}`,
            formData,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    async getDrafts(
        params?: DraftJournalQuery
    ): Promise<JournalPageResponse> {

        const { data } =
            await client.get<JournalPageResponse>(
                "/journals/drafts",
                {
                    params,
                }
            );

        return data;
    }

    async getDraftOverview(): Promise<DraftOverview> {

        const { data } =
            await client.get<DraftOverview>(
                "/journals/drafts/overview"
            );

        return data;
    }

    async getDraftById(
        journalId: string
    ): Promise<JournalResponse> {

        const { data } = await client.get<JournalResponse>(
            `/journals/drafts/${journalId}`
        );

        return data;
    }

    async deleteDraft(
        journalId: string
    ): Promise<MessageResponse> {

        const { data } = await client.delete<MessageResponse>(
            `/journals/drafts/${journalId}`
            ,
            {
                timeout: 60000,
            }
        );

        return data;
    }

    async deleteDraftImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        const { data } =
            await client.delete<JournalResponse>(
                `/journals/drafts/${journalId}/images`,
                {
                    params: {
                        publicId,
                        timeout: 60000,
                    },
                }
            );

        return data;
    }

    async replaceDraftImage(
        journalId: string,
        publicId: string,
        formData: FormData
    ): Promise<JournalResponse> {

        const { data } =
            await client.put<JournalResponse>(
                `/journals/drafts/${journalId}/images`,
                formData,
                {
                    params: {
                        publicId,
                        timeout: 60000,
                    },
                }
            );

        return data;
    }

    async setDraftCoverImage(
        journalId: string,
        publicId: string
    ): Promise<JournalResponse> {

        const { data } =
            await client.patch<JournalResponse>(
                `/journals/drafts/${journalId}/cover`,
                null,
                {
                    params: {
                        publicId,
                    },
                }
            );

        return data;
    }

    async publishDraft(
        journalId: string
    ): Promise<JournalResponse> {

        const { data } = await client.post<JournalResponse>(
            `/journals/drafts/${journalId}/publish`,
            {
                timeout: 60000,
            }
        );

        return data;
    }
}

export default new JournalApi();