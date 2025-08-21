import React, { useState } from 'react';
import {Card, Skeleton, Button} from "@heroui/react";



export default function LoadingScreen() {
  
    
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="flex flex-col gap-3 mx-auto max-w-md mt-3">
      <Card className=" space-y-5 p-4" radius="lg">

        
       
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-200" />
          </Skeleton>
        </div>

         <Skeleton className="rounded-lg" isLoaded={isLoaded}>
          <div className="h-24 rounded-lg bg-secondary" />
        </Skeleton>
      </Card>
      
    </div>
  );
}



