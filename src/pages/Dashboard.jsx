import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import Error from '@/components/Error'
import useFetch from '@/hooks/useFetch'
import { UrlState } from '@/Context'
import { getUrls } from '@/db/apiUrls'
import { getClicksForUrls } from '@/db/apiClicks'
import LinkCard from '@/components/LinkCard'
import CreateLink from '@/components/CreateLink'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const { user } = UrlState(); // to ensure user is fetched before
    const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id);
    const { loading: loadingClicks, error: clicksError, data: clicks, fn: fnClicks } = useFetch(
        getClicksForUrls,
        urls?.map((url) => url.id)

    )

    useEffect(() => {
        fnUrls();
    }, []);

    const filteredUrls = urls?.filter((url) =>
        url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (urls?.length) {
            fnClicks();
        }
    }, [urls?.length]);



    return (
        <div className='flex flex-col gap-8'>
            {(loading || loadingClicks) && (< BarLoader width={"100%"} color="#36d7b7" />)}
            <div className='grid grid-cols-2 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                        <CardDescription>Total Links Created</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                        <CardDescription>Total Clicks on all link</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length}</p>
                    </CardContent>
                </Card>
            </div>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-extrabold'>My Links</h1>
                <CreateLink />
            </div>

            <div className='relative'>
                <Input type="text" placeholder="Search your links..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Filter className='absolute top-2 right-2 p-1' />
            </div>
            {error && <Error message={error?.message} />}
            {(filteredUrls || []).map((url, i) => (
                <LinkCard key={i} url={url} fetchUrls={fnUrls} />
            ))}
        </div>
    )
}

export default Dashboard