import type { Candidate } from "https://deno.land/x/ddc_vim@v0.13.0/types.ts";
import { BaseSource } from "https://deno.land/x/ddc_vim@v0.13.0/types.ts";
import type {
  GatherCandidatesArguments,
} from "https://deno.land/x/ddc_vim@v0.13.0/base/source.ts";

type Params = {
  expr: string;
  ignoreFail: boolean;
};

export class Source extends BaseSource<Params> {
  async gatherCandidates(
    args: GatherCandidatesArguments<Params>,
  ): Promise<Candidate[]> {
    const p = args.sourceParams;
    let cs = args.denops.eval(p.expr) as Promise<Candidate[]>;
    if (p.ignoreFail) cs = cs.catch(() => []);
    return await cs;
  }

  params(): Params {
    return {
      expr: "[]",
      ignoreFail: false,
    };
  }
}
