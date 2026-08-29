import { useQuery } from "@tanstack/react-query";
import { scheduleService } from "../services/schedule/scheduleService";

export default function useToday() {
  return useQuery({
    queryKey: ["schedule", "today"],
    queryFn: scheduleService.today,
    enabled: Boolean(localStorage.getItem("lifesync_token"))
  });
}