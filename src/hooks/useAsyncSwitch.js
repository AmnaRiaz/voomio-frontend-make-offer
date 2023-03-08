import { useEffect, useState } from 'react';

export const useAsyncSwitch = (initializer) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof initializer === 'boolean') {
            setIsChecked(initializer);
            return;
        }

        setIsLoading(true);
        initializer()
            .then((res) => {
                setIsChecked(res);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSwitch = (updater) => {
        setIsChecked((p) => !p);

        updater().catch(() => {
            setIsChecked((p) => !p);
        });
    };

    return [isLoading, isChecked, handleSwitch];
};
