/* eslint-disable @typescript-eslint/no-explicit-any */
import { StackHandler } from "@stackframe/stack"
import { stackServerApp } from "@/stack"

export default function Handler(routeProps: any) {
  return <StackHandler fullPage app={stackServerApp} routeProps={routeProps} />
} 