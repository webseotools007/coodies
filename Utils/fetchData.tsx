const GetData = (url: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'GET' })
            .then(r => r.json().then(data => resolve({ status: r.status, ...data })))
            .catch((e) => {
                throw e;
            });
    });
};
const PostData = (url: string, data: any) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'POST', body: data })
            .then(r => r.json().then(data => resolve({ status: r.status, ...data })))
            .catch((e) => {
                throw e;
            });
    });
};
const PutData = (url: string, profileUrl: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'PUT', body: profileUrl })
            .then(r => r.json().then(data => resolve({ status: r.status, ...data })))
            .catch((e) => {
                throw e;
            });
    });
};
const PatchData = (url: string, profileUrl: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'PATCH', body: profileUrl })
            .then(r => r.json().then(data => resolve({ status: r.status, ...data })))
            .catch((e) => {
                throw e;
            });
    });
};
const DeleteData = (url: string) => {
    return new Promise((resolve) => {
        fetch(url, { method: 'DELETE' })
            .then(r => r.json().then(data => resolve({ status: r.status, ...data })))
            .catch((e) => {
                throw e;
            });
    });
};
export { GetData, PostData, PutData, PatchData, DeleteData };
