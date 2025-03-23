import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
	NotFoundException,
} from "@nestjs/common";
import { type Observable, tap } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		return next.handle().pipe(
			tap((data) => {
				if (!data) throw new NotFoundException();
			}),
		);
	}
}
