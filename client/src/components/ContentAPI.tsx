import React from 'react';
import { useGetAllTodosQuery } from '../store/services/todos';

const ContentAPI = () => {
    const {data, isLoading} = useGetAllTodosQuery()

    return (
        <div>
            {
                data?.map(d => <p>{d.title}</p>)
            }
        </div>
    );
};

export default ContentAPI;