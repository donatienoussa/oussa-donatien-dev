"use client"

import { useAppwrite } from "@/hooks/useAppwrite"
import { fetchSingleService } from "@/lib/actions/services"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  params: { id: string }
}

function ShowService({params}: Props) {
  const { id } = params;

  const { data: service, loading, error } = useAppwrite({
    fn: fetchSingleService,
    params: { id: id! },
  })

  if (!id) {
    return <p className="text-center text-red-500 mt-10">Aucun ID fourni.</p>
  }

  if (loading) {
    return <Skeleton className="w-full h-[200px] rounded-xl mt-10" />
  }

  if (error || !service) {
    return <p className="text-center text-red-500 mt-10">Service introuvable.</p>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {service.description}
          </p>
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-muted-foreground uppercase">Sous-services</h3>
            <div className="flex flex-wrap gap-2">
              {service.listOfSubServices?.map((item: string, index: number) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Badge
              className={
                service.show
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }
            >
              {service.show ? "En vente" : "Hors vente"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Link href="/admin/services">
          <Button variant="ghost">← Retour aux services</Button>
        </Link>
      </div>
    </div>
  )
}

export default ShowService
