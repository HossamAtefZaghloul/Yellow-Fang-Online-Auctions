declare module 'node-cron' {
    export type ScheduledTask = {
      start: () => void;
      stop: () => void;
    };
  
    export function schedule(
      cronExpression: string,
      callback: () => void,
      options?: { scheduled?: boolean; timezone?: string }
    ): ScheduledTask;
  }